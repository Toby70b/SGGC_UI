import React, {useState} from "react";
import {Typography, Row, Col} from "antd";
import GroupGameSearchPanel from "../GroupGameSearchPanel/GroupGameSearchPanel";
import GroupGameSearchResultsPanel from "../GroupGameSearchResultsPanel/GroupGameSearchResultsPanel";
import {GithubOutlined, LinkedinOutlined} from '@ant-design/icons';
import {Link} from "@material-ui/core";
import {getCommonGamesBetweenUsers} from "../../service/sggc";
import {
    INSUFFICIENT_STEAM_IDS_MESSAGE,
    INTERNAL_SERVER_ERROR_MESSAGE,
    GITHUB_URL,
    LINKED_IN_URL
} from "../../util/Constants";
import "./GroupGameSearchPage.css"

const {Title} = Typography;


function GroupGameSearchPage() {

    const [resultsDataSource, setResultsDataSource] = useState([])
    const [displayResults, setDisplayResults] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const onSuccess = (jsonResponse) => {
        setResultsDataSource(jsonResponse.body);
        setLoading(false);
    }

    const onFetchError = (error) => {
        setErrorMessageByResponseCode(error)
        setDisplayResults(false);
        setLoading(false)
    }

    const resetSearchPage = () => {
        setDisplayResults(true);
        setErrorMessage("")
        setLoading(true);
    }

    const setErrorMessageByResponseCode = (error) => {
        if (error.body && error.body.errorMessage) {
            setErrorMessage(error.body.errorMessage)
        } else {
            setErrorMessage(INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    const handleSearch = (requestObj) => {
        if (requestObj.steamIds.length >= 2) {
            resetSearchPage();
            getCommonGamesBetweenUsers(requestObj, onSuccess, onFetchError)
        } else {
            setErrorMessage(INSUFFICIENT_STEAM_IDS_MESSAGE)
        }
    }

    return (
        <div>
            <Row type="flex" justify="center">
                <Col xs={24} md={18} lg={14} xxl={7}>
                    <div className={"title"}>
                        <Row type="flex" justify="center">
                            <Title align="center">Steam Group Game Checker</Title>
                        </Row>
                        <Row type="flex" justify="center">
                            <div className={"smallPadding"}>
                                <Link id="githubLink" href={GITHUB_URL} title="Github Project"><GithubOutlined
                                    className={"icon"}/></Link>
                            </div>
                            <div className={"smallPadding"}>
                                <Link id="linkedinLink" href={LINKED_IN_URL} title="Linked In Profile"><LinkedinOutlined
                                    className={"icon"}/></Link>
                            </div>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" className={"row"}>
                <Col xs={23} md={20} lg={16} xxl={9}>
                    <GroupGameSearchPanel
                        onSearch={handleSearch}
                        errorMessage={errorMessage}
                    />
                </Col>
            </Row>
            <Row type="flex" justify="center" className={"row"}>
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
