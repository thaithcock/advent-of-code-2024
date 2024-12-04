use std::fs;
use fancy_regex::Regex;
use fancy_regex::Captures;

fn main() {
    let file = match fs::read_to_string("../input.txt") {
        Ok(file) => file,
        Err(error) => panic!("Problem opening {error:?}"),
    };

    // (^|do\(\)).*?((mul\([0-9]{1,3},[0-9]{1,3}\)).*?)(don't\(\)|$)
    let re = Regex::new(r"(?<=do\(\)|^)(?<!don\'t\(\)).*?(mul\([0-9]{1,3},[0-9]{1,3}\))").unwrap();
    let instructions: Vec<Captures> = re.captures_iter(&file).collect();
    println!("Capture groups:");
    let mut total: u32 = 0;
    for instruction in instructions.iter() {
        print!("{}", &instruction[1]);
        print!("\t");
        let numbies: Vec<u16> = instruction[1][4..instruction[1].len()-1].to_string().split(",").map(|numb| numb.parse::<u16>().unwrap()).collect();
        print!("{},\t{}", &numbies[0], &numbies[1]);
        print!("\t");
        let product: u32 = u32::from(numbies[0]) * u32::from(numbies[1]);
        print!("{}", &product);
        print!("\t");
        total += product;
        print!("{}", &total);
        print!("\t");
        println!("");
    }
}