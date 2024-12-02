package main

import (
	"fmt"
	"strings"

	"github.com/fatih/color"
)

func reportIsReallySafe(report []int) bool {
	// levels are either all increasing or all decreasing (staying the same not allowed)
	allIncreasing := report[1]-report[0] > 0
	allDecreasing := report[1]-report[0] < 0
	isSafe := allIncreasing || allDecreasing
	// change is at least 1 and less than 3
	changeWithinRange := true

	var badIndex int

	fmt.Print("[", report[0])

	for index, level := range report[1:] {
		diff := level - report[index]
		if diff < 0 {
			diff = -diff
		}
		if diff < 1 || diff > 3 {
			changeWithinRange = false
			badIndex = index + 1
		}
		if allIncreasing {
			if level > report[index] {
				color.Set(color.FgGreen)
				fmt.Print(" /")
				allDecreasing = false
				color.Unset()
			} else {
				color.Set(color.FgRed)
				fmt.Print(" \\")
				allIncreasing = false
				color.Unset()
				if badIndex == 0 {
					badIndex = index + 1
				}
			}
		} else if allDecreasing {
			if level < report[index] {
				color.Set(color.FgGreen)
				fmt.Print(" \\")
				allIncreasing = false
				color.Unset()
			} else {
				color.Set(color.FgRed)
				fmt.Print(" /")
				allDecreasing = false
				color.Unset()
				if badIndex == 0 {
					badIndex = index + 1
				}
			}
		} else {
			if badIndex == 0 {
				badIndex = index + 1
			}
			color.Set(color.FgRed)
			fmt.Print(" -")
			color.Unset()
		}
		isSafe = isSafe && (allIncreasing || allDecreasing) && changeWithinRange
		if isSafe {
			color.Set(color.FgGreen)
		} else {
			color.Set(color.FgRed)
		}
		fmt.Print(" ", level)
		color.Unset()
	}
	if isSafe {
		color.Set(color.FgGreen)
	} else {
		color.Set(color.FgRed)
	}
	fmt.Print("]")
	color.Unset()
	padding := 40 - len(strings.Trim(strings.Join(strings.Split(fmt.Sprint(report), " "), "   "), "[]"))
	for ; padding > 0; padding-- {
		fmt.Print(" ")
	}
	fmt.Print("\t", badIndex, " ", badIndex, " ", (allIncreasing || allDecreasing) && changeWithinRange)
	if !isSafe {
		isSafe = reportIsSafe(appendImmutably(report[0:badIndex], report[badIndex+1:]))
	}
	if !isSafe {
		isSafe = reportIsSafe(appendImmutably(report[0:badIndex-1], report[badIndex:]))
	}
	if !isSafe && badIndex < len(report)-2 {
		isSafe = reportIsSafe(appendImmutably(report[0:badIndex+1], report[badIndex+2:]))
	}
	if !isSafe {
		isSafe = reportIsSafe(report[1:])
	}

	return isSafe
}

func appendImmutably[T any](arrs ...[]T) []T {
	var newArray = []T{}

	for _, arr := range arrs {
		newArray = append(newArray, arr...)
	}
	return newArray
}
