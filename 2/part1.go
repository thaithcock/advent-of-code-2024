package main

import (
	"fmt"
	"strings"

	"github.com/fatih/color"
)

func reportIsSafe(report []int) bool {
	isSafe := true
	// levels are either all increasing or all decreasing (staying the same not allowed)
	allIncreasing := report[1]-report[0] > 0
	allDecreasing := report[1]-report[0] < 0
	// change is at least 1 and less than 3
	changeWithinRange := true

	fmt.Print("\t[", report[0])

	for index, level := range report[1:] {
		diff := level - report[index]
		if diff < 0 {
			diff = -diff
		}
		if diff < 1 || diff > 3 {
			changeWithinRange = false
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
			}
		} else {
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
	color.Unset()
	padding := 40 - len(strings.Trim(strings.Join(strings.Split(fmt.Sprint(report), " "), "   "), "[]"))
	for ; padding > 0; padding-- {
		fmt.Print(" ")
	}
	fmt.Print("\t", isSafe)

	return isSafe
}
