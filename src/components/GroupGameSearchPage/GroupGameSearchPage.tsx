import React, {useState} from "react";
import {Typography, Row, Col, Anchor, Button} from "antd";
import GroupGameSearchPanel from "../GroupGameSearchPanel/GroupGameSearchPanel";
import GroupGameSearchResultsPanel from "../GroupGameSearchResultsPanel/GroupGameSearchResultsPanel";
import {GithubOutlined, LinkedinOutlined} from '@ant-design/icons';
import {getCommonGamesBetweenUsers} from "../../service/sggc";
import "./GroupGameSearchPage.css"
import {GroupGameSearchResponse} from "../../model/GroupGameSearchResponse";
import {ApiError} from "../../model/ApiError";
import GroupGameSearchRequest from "../../model/GroupGameSearchRequest";
import {Application} from "../../model/Application";

const {Link} = Anchor;
const {Title} = Typography;

function GroupGameSearchPage() {

    const responseMessages = {
        insufficientSteamIds: "Please enter at least 2 Steam Id's",
        internalServerError: "Something went wrong with the checker please try again later..."
    };

    const externalUrls = {
        githubUrl: "https://github.com/Toby70b",
        linkedInUrl: "https://www.linkedin.com/in/tobias-peel/"
    };

    const [resultsDataSource, setResultsDataSource] = useState<Application[]>([])
    const [displayResults, setDisplayResults] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const onSuccess = (jsonResponse: GroupGameSearchResponse) => {
        setResultsDataSource(jsonResponse.body as Application[]);
        setLoading(false);
    }

    const onFetchError = (error: GroupGameSearchResponse) => {
        setErrorMessageByResponseCode(error)
        setDisplayResults(false);
        setLoading(false)
    }

    const resetSearchPage = () => {
        setDisplayResults(true);
        setErrorMessage("")
        setLoading(true);
    }

    const setErrorMessageByResponseCode = (response: GroupGameSearchResponse) => {
        let error: ApiError = response.body as ApiError;
        if (error && error.errorMessage) {
            setErrorMessage(error.errorMessage)
        } else {
            setErrorMessage(responseMessages.internalServerError)
        }
    }

    const handleSearch = (request: GroupGameSearchRequest) => {
        if (request.getSteamIds.length >= 2) {
            resetSearchPage();
            getCommonGamesBetweenUsers(request, onSuccess, onFetchError)
        } else {
            setErrorMessage(responseMessages.insufficientSteamIds)
        }
    }

    return (
        <div>
            <Row justify="center">
                <Col xs={24} md={18} lg={14} xxl={7}>
                    <div className={"title"}>
                        <Row justify="center">
                            <Title>Steam Group Game Checker</Title>
                        </Row>
                        <Row justify="center">
                                <div className={"smallPadding"}>
                                    <Button type={"link"} href={externalUrls.githubUrl} title="Github Project"><GithubOutlined
                                        className={"icon"}/></Button>
                                </div>
                                <div className={"smallPadding"}>
                                    <Button type={"link"} href={externalUrls.linkedInUrl} title="Linked In Profile"><LinkedinOutlined
                                        className={"icon"}/></Button>
                                </div>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row justify="center" className={"row"}>
                <Col xs={23} md={20} lg={16} xxl={9}>
                    <GroupGameSearchPanel
                        onSearch={handleSearch}
                        errorMessage={errorMessage}
                    />
                </Col>
            </Row>
            <Row justify="center" className={"row"}>
                <Col xs={23} md={20} lg={16} xxl={9}>
                    {displayResults &&
                        <GroupGameSearchResultsPanel
                            isLoading={loading}
                            dataSource={resultsDataSource}
                        />
                    }
                </Col>
            </Row>
        </div>
    );

}

export default GroupGameSearchPage
