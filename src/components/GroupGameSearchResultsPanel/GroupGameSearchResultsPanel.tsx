import React, {useState} from "react";
import {Card, Table} from "antd";
import './GroupGameSearchResultsPanel.css'
import {Application} from "../../model/Application";
import TableColumnTextFilterConfig from "./TableColumnSearchFilter";
import {ColumnsType} from "antd/es/table";

type ResultsPanelProps = {
    dataSource: Application[]
    isLoading: boolean
}

function GroupGameSearchResultsPanel(props: ResultsPanelProps) {

    const STEAM_MEDIA_REPO = "https://steamcdn-a.akamaihd.net/steam/apps/"
    const HEADER_IMAGE_FILE_NAME = "header_292x136.jpg"
    const STEAM_URL = "https://store.steampowered.com/app/";


    const columns: ColumnsType<Application>  = [
        {
            title: '',
            key: 'appid',
            render: (record: Application) => <img className={"gameThumbnail"} alt={"Steam App Thumbnail"}
                                                  src={STEAM_MEDIA_REPO + record.appid + "/" + HEADER_IMAGE_FILE_NAME}/>
        },
        {
            title: 'Name',
            key: 'name',
            render: (record: Application) => (<a href={STEAM_URL + record.appid + "/"}>{record.name}</a>),
            ...TableColumnTextFilterConfig<Application>(),
            onFilter: (value : string | number | boolean, record : Application) => {
                return record.name.toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase());
            },

        },
    ]

    return (
        <div>
            <Card title={<h2>Search Results</h2>} loading={props.isLoading}
                  className={"boxShadow"}>
                {!props.isLoading &&
                    <Table
                        dataSource={props.dataSource}
                        columns={columns}
                        rowKey={(record) => record.appid}
                        pagination={false}
                        scroll={{y:430}}
                    />
                }
            </Card>
        </div>
    );

}

export default GroupGameSearchResultsPanel



