# DND Calculator
This Design Doc will be created using guidelines described in the Initial Planning document.

## SPRINT 1 WEEK 1
| MON | TUES | WED  | THURS | FRI |
|--|--|--|--|--|
|~~(0.5 pts) Sprint Planning~~|(0.5 pts) Button/Input Initialization|(1 pt) Range of Hit Dice VS AC graph|(1 pt) DPS Calculation per Character|(0.5 pts) Sprint Retrospective|
|~~(0.5 pts) Initialize Inputs and Buttons~~|(0.5 pts) Graph Initialization|||(0.5 pts) Input Validation|


## Project Description
Dungeons and Dragons is a popular tabletop game used to simulate combat and roleplaying. In order to practice my data visualization skills, I will create a simple web page that will allow the user to enter information about two individuals in physical combat and display statistical information about the result of the fight.
Page layout is included in the screenshot below:


## Project Workflow
Users will input basic stats for two combatants (Attacker and Defender) which, when the "Calculate" button is pressed, will three sets of informatics will appear: 1) A pie chart depicting the odds that the attacker will win. 2) A bar chart that will display the possible rolls that the attacker and defender and a vertical line depicting the value needed to hit the other opponent (their AC). 3) A table depicting the odds that each combatant is defeated at each turn.

## Story Tasks and Requirements
This project will be divided into three parts:
1. User Interface (Buttons, input fields, and graph initialization)
	- 8 Text inputs
		- Attacker/Defender AC
		- Attacker/Defender HP
		- Attacker/Defender Hit Dice
		- Attacker/Defender Damage Dice
	- 2 Buttons
		- Calculate Result
		- Clear All Inputs
2. Functionality (JS functions and input handling)
	- Clearing Inputs
	- Data Validation
	- Processing input for visualization
3. Data Visualization (Dynamic graphs)
	- Average DPS per character
	- Odds of which character would win
	- Range of Hit Dice vs opposing AC


## Technologies
- HTML
- JS
- Chart.js
- Bootstrap 5


## Additional Features
The following are "nice to have" features that are not to be added to this current iteration of the project.
- Toggle for who goes first.
- Multiple attacks.
- Average health per round.
- Calculating spells.
- Table that shows how much health each character would have after each round.
- Enhancement (Bless, Bane, Etc.).
