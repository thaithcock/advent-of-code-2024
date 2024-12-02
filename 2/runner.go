package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/fatih/color"
)

func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	var reports [][]int
	scanner := bufio.NewScanner(file)
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	for scanner.Scan() {
		var reportStrings []string = strings.Split(scanner.Text(), " ")
		var report []int
		for _, element := range reportStrings {
			i, err := strconv.Atoi(element)
			if err != nil {
				panic(err)
			}
			report = append(report, i)
		}
		reports = append(reports, report)
	}

	sumOfSafeReports := 0

	for index, report := range reports {
		fmt.Print("\n[", index, "]", "\t")
		if reportIsReallySafe(report) {
			sumOfSafeReports++
			color.Set(color.FgGreen)
		} else {
			color.Set(color.FgRed)
		}
		fmt.Print(" ", sumOfSafeReports)
		color.Unset()
	}

	fmt.Print("\n", sumOfSafeReports)
}
