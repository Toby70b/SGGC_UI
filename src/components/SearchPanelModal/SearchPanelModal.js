import React from 'react';
import './SearchPanelModal.css';
import {Collapse, Modal} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
const {Panel} = Collapse;
function SearchPanelModal(props) {
    return (<Modal
            title={<h2>FAQ</h2>}
            visible={props.visible}
            footer={[null]}
            onCancel={props.onCancel}
            data-testid="SearchPanelModal"
        >
            <Collapse>
                <Panel header="What is this?" key="1">
                    <Paragraph>
                        This is a tool that, when provided with two or more Steam Ids or vanity URLs will return a
                        list of common
                        games.
                    </Paragraph>
                </Panel>
                <Panel header="How do I find Steam Ids / Vanity URLs?" key="2">
                    <Paragraph>
                        <ul>
                            <li>
                                <Paragraph>Go to a friends profile page on Steam</Paragraph>
                            </li>
                            <li>
                                <Paragraph>Copy the url</Paragraph>
                                <Paragraph>
                                    <b>Note</b> If you're using the app right click anywhere on the screen
                                    and select "Copy Page URL" from the menu.
                                </Paragraph>
                            </li>
                            <li>
                                <Paragraph>Look for the number at the end, this is a Steam id</Paragraph>
                                <Paragraph> https://steamcommunity.com/profiles/<b>76561198045206229</b>/</Paragraph>
                            </li>
                            <li>
                                <Paragraph>If instead of a number its a name, then that's a vanity URL. This can
                                    also be used to search.</Paragraph>
                            </li>
                        </ul>
                    </Paragraph>
                </Panel>
                <Panel header="Why make this?" key="3">
                    <Paragraph>
                        I belong to a group of 5-6 20 something friends whose primary hobby is gaming, as such we
                        all have steam accounts with each of us owning at least 200 games. We all prefer to play
                        games together, we don’t mind replaying games, including older games, if it means we can
                        play
                        together. We would occasionally ask what games we have in common, however since steam only
                        allows users to compare their lists with one other user at a time this task was very
                        tedious. I wanted more excuses to practice on REST APIs so I researched Steam's API and
                        once I discovered it was feasible to make a tool that could compare multiple users lists for
                        common games I decided to make this tool.
                    </Paragraph>
                </Panel>
                <Panel
                    header="I've searched for multiplayer games only, yet some single player games appear. Are you just an idiot?"
                    key="4">
                    <Paragraph>
                        Wellllllllllll.........
                    </Paragraph>
                    <Paragraph>
                        So over time the Steam API loses information on games still owned by users. This can be
                        because it’s been pulled off steam,
                        or the developer has accidentally created duplicate entries. Because of my requirements (We
                        wanted all possible multiplayer games showed)
                        I decided that in these cases the game should still appear in the list of multiplayer games.
                    </Paragraph>
                </Panel>
            </Collapse>
        </Modal>
    );
}

export default SearchPanelModal;
