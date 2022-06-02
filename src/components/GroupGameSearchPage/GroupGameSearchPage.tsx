import React, {useState} from "react";
import {Typography, Row, Col} from "antd";
import GroupGameSearchPanel from "../GroupGameSearchPanel/GroupGameSearchPanel";
//TODO remove below
// @ts-ignore
import GroupGameSearchResultsPanel from "../GroupGameSearchResultsPanel/GroupGameSearchResultsPanel";
import {GithubOutlined, LinkedinOutlined} from '@ant-design/icons';
import {Link} from "@material-ui/core";
//TODO remove below
// @ts-ignore
import {getCommonGamesBetweenUsers} from "../../service/sggc";
import "./GroupGameSearchPage.css"
import GroupGameSearchResponse from "../../model/GroupGameSearchResponse";
import ApiError from "../../model/ApiError";
import GroupGameSearchRequest from "../../model/GroupGameSearchRequest";

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

    const [resultsDataSource, setResultsDataSource] = useState<GroupGameSearchResponse>()
    const [displayResults, setDisplayResults] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const onSuccess = (jsonResponse: {body : GroupGameSearchResponse}) => {
        setResultsDataSource(jsonResponse.body);
        setLoading(false);
    }

    const onFetchError = (error : GroupGameSearchResponse) => {
        setErrorMessageByResponseCode(error)
        setDisplayResults(false);
        setLoading(false)
    }

    const resetSearchPage = () => {
        setDisplayResults(true);
        setErrorMessage("")
        setLoading(true);
    }

    const setErrorMessageByResponseCode = (response : GroupGameSearchResponse) => {
        let error : ApiError = response.getBody;
        if (error && error.getErrorMessage) {
            setErrorMessage(error.getErrorMessage)
        } else {
            setErrorMessage(responseMessages.internalServerError)
        }
    }

    const handleSearch = (request : GroupGameSearchRequest) => {
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
                        <Row>
                            <Title>Steam Group Game Checker</Title>
                        </Row>
                        <Row justify="center">
                            <div className={"smallPadding"}>
                                <Link id="githubLink" href={externalUrls.githubUrl} title="Github Project"><GithubOutlined
                                    className={"icon"}/></Link>
                            </div>
                            <div className={"smallPadding"}>
                                <Link id="linkedinLink" href={externalUrls.linkedInUrl} title="Linked In Profile"><LinkedinOutlined
                                    className={"icon"}/></Link>
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
