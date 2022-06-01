import React, {useState} from "react";
import 'antd/dist/antd.min.css';
import {
    Alert,
    Button,
    Card,
    Checkbox,
    Col,
    Form,
    Input,
    Popconfirm,
    Row,
    Table
} from 'antd';
import {Fade} from '@material-ui/core';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import './GroupGameSearchPanel.css'
import '../common.css'
import {ValidationResult} from "../../model/ValidationResult";
import SearchPanelModal from "../SearchPanelModal/SearchPanelModal";

function GroupGameSearchPanel(props) {
    const [dataSource, setDataSource] = useState([]);
    const [multiplayerOnly, setMultiplayerOnly] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const VANITY_URL_NOT_ALPHANUMERIC_ERROR_MESSAGE = "Vanity URL must not contain special characters";
    const VANITY_URL_NOT_WITHIN_REQUIRED_LENGTH_ERROR_MESSAGE = "Vanity URL must be between 3 and 32 characters long";

    const columns = [
        {
            title: 'Steam Id / Vanity URL',
            dataIndex: 'id',
            key: 'id',
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ]

    const validationRules = [
        {
            required: true,
            message: 'Please enter a Steam Id or Vanity URL',
        },
        ({getFieldValue}) => ({
            validator(_, value) {
                if (value) {
                    let validationResult = validateSteamId(value);
                    return validationResult.error ? Promise.reject(validationResult.errorMessage) : Promise.resolve();
                }
                return Promise.reject();
            },
        }),
    ]

    const collectFormData = () => {
        let request = {};
        request.steamIds = getSteamIdsForRequest()
        request.multiplayerOnly = multiplayerOnly;
        return request;
    }

    const getSteamIdsForRequest = () => {
        let steamIds = [];
        dataSource.forEach(function (item) {
            steamIds.push(item.id);
        });
        return steamIds
    }

    const handleSearch = () => {
        props.onSearch(collectFormData())
    }

    const handleDelete = id => {
        setDataSource(dataSource.filter(item => item.id !== id));
    };

    const handleAdd = (value) => {
        const newList = dataSource.concat({key: value.steamId + dataSource.length, id: value.steamId});
        setDataSource(newList);
    }

    const handleModalOpen = () => {
        setModalVisible(true);
    }

    const handleCancel = () => {
        setModalVisible(false);
    }

    const validateSteamId = (value) => {
        if (!isSteamId(value)) {
            return validateVanityUrl(value);
        }
        return new ValidationResult(false);
    };

    const isSteamId = (value) => {
        let beginsWithSteamIdNumber = value.startsWith('7') || value.startsWith('8') || value.startsWith('9')
        let isSeventeenCharactersLong = value.length === 17;
        let isNumeric = /^\d+$/.test(value)
        return beginsWithSteamIdNumber && isSeventeenCharactersLong && isNumeric;
    }

    const validateVanityUrl = (vanityUrl) => {
        let containsNoSpecialCharacters = /^[A-Za-z0-9]*$/.test(vanityUrl)
        let isCorrectLength = vanityUrl.length > 2 && vanityUrl.length < 33;
        if (!containsNoSpecialCharacters) {
            return new ValidationResult(true, vanityUrl, VANITY_URL_NOT_ALPHANUMERIC_ERROR_MESSAGE)
        }
        if (!isCorrectLength) {
            return new ValidationResult(true, vanityUrl, VANITY_URL_NOT_WITHIN_REQUIRED_LENGTH_ERROR_MESSAGE)
        }
        return new ValidationResult(false);
    }

    function handleCheck(e) {
        setMultiplayerOnly(e.target.checked)
    }

    function Header() {
        return (
            <Row>
                <Col xs={2} sm={8}>
                    <h2>Search for Common Games</h2>
                </Col>
                <Col xs={24} sm={{span: 3, offset: 13}}>
                    <Button type="primary" onClick={handleModalOpen}>Help</Button>
                </Col>
            </Row>

        );
    }

    return (
        <div>
            <SearchPanelModal visible={modalVisible} onCancel={handleCancel}/>

            <Card title={<Header/>} className={"boxShadow"}>
                <Fade in={props.errorMessage !== ''} timeout={{"enter": 1000, "exit": 0}} unmountOnExit={true}>
                    <Alert
                        showIcon
                        type={"error"}
                        message={"Error"}
                        description={props.errorMessage}
                        className={"alert"}
                    />
                </Fade>
                <div className={"marginBottom"}>
                    <div>
                        <Form
                            name="basic"
                            onFinish={handleAdd}
                            layout={"inline"}
                            id={"steamIdForm"}
                        >
                            <Row>
                                <Form.Item
                                    name="steamId"
                                    rules={validationRules}
                                >
                                    <Input className={"marginBottom"} addonBefore={"Steam Id / Vanity URL:"}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button classicon={<PlusOutlined/>} type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </div>
                </div>

                <Table dataSource={dataSource} columns={columns} rowKey={record => record.key} scroll={{y: 300}}
                       pagination={false} style={{marginBottom: 18}}/>
                <Row type="flex" justify="end">
                    <Checkbox onChange={handleCheck}>
                        Multiplayer only?
                    </Checkbox>
                    <Button type="primary" icon={<SearchOutlined/>} onClick={handleSearch}>
                        Search
                    </Button>
                </Row>
            </Card>
        </div>
    );

}

export default GroupGameSearchPanel;
