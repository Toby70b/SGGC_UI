
# SteamGroupGameChecker UI - Tool to find out common steam games between users

⛔ PLEASE NOTE: This should be obvious but none of the code here should be considered "production ready" by a business standard. 

:wave:: a working version of this can be found hosted on AWS [here](https://www.steamgroupgamechecker.co.uk/). 
For maximum cost-effectiveness (and because I'm cheap :smile:) the API is running on Spot EC2 instances, 
so it could go down if the AZ its running on is in particular demand
 
 ## AWS architecture diagram
 
![SGGC Diagram](https://user-images.githubusercontent.com/35812795/160235199-29a246e0-6da8-4371-b02b-027195adb380.png)

## Rationale for development

I belong to a group of 5-6 20 something friends whose primary hobby is gaming, as such we all have steam accounts with 
each of us owning at least 200 games. We all prefer to play games together, we don't mind replaying games, including 
older games, if it means we can play together. We would occasionally ask what games we have in common, however since 
steam only allows users to compare their lists with one other user at a time this task was very tedious. I wanted more 
excuses to practice on REST API's so I researched Steam's API and once I discovered it was feasible to make a tool 
that could compare multiple users lists for common games I decided to make this tool.

## REST API

The code for the API is stored within another repo [here](https://github.com/Toby70b/SGGC_WS)

## UI

The UI is made with React with components from the ant design UI framework, all running on an node.js server. 
The UI allows the user to enter a number of Steam ids and Vanity URLs and search for the common games between the users,
there is some simple validation preventing the user from entering invalid input. I've also added some Qol features such 
allowing the user to remove users from the search list. Once a search is performed a new panel will appear that, 
upon success of the fetch will display a scrollable table of the users common games, this table will have two columns; 
one in which the image of the game will be displayed (pulled from steamcdn-a.akamaihd.net) and the second which will 
display the games name, this doubles as a link to the game's Steam store page.

## Docker

The UI has a docker image ready for containerization

tobypeel/steam_group_game_checker_ui:prod

## Things to improve

- [ ] General cleanup and refactoring
- [ ] Improve logging framework, especially with AWS

## Thanks to

https://steamcommunity.com/dev (without it this wouldn't exist, and I wouldn't have had the practice) 
