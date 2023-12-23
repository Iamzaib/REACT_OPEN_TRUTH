import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Input,
    Spinner,
    Button,
    Form,
} from "reactstrap";
import { IoSend } from "react-icons/io5";
import user from "../assets/img/user.png";
import bot from "../assets/img/bot.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { startChatAction } from "../store/actions/chattingAction";
import { useEffect } from "react";
import { DotPulse } from "@uiball/loaders";
import { async } from "q";
const AdminView = () => {
    const dispatch = useDispatch();
    const [typeMessage, setTypeMessage] = useState("");
    const { chat, loading } = useSelector((state) => state.chatting);
    const [chats, setChats] = useState([]);
    const initialMessages = [
        {
            id: 1,
            title: "Suggest some codenames",
            description:
                "for a project introducing flexible work arrangements.",
        },
        {
            id: 2,
            title: "Tell me a fun fact",
            description: "about the Roman Ampire",
        },
        {
            id: 3,
            title: "Help me study",
            description: "vocabulary for a college entrance exam",
        },
        {
            id: 4,
            title: "Create a chracter",
            description: "to start a film club",
        },
    ];
    const submit = (input) => {
        setTypeMessage(input);
        let obj = {
            inputs: input,
            parameters: {
                n: 1,
                max_new_tokens: 512,
                temperature: 1,
                top_p: 0.9,
            },
        };
        if (input != "") {
            dispatch(
                startChatAction(obj, () => {
                    setTypeMessage("");
                })
            );
            let updateChat = { user: input, bot: "Thinking...." };
            setChats([...chats, updateChat]);
        } else {
            alert("Please must enter the meesage!");
        }
    };
    useEffect(() => {
        setChats(chat);
    }, [chat]);
    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col lg="5">
                        <div className="py-2">
                            <h1 className="text-center title">OPEN TRUTH</h1>
                            <p className="text-center mb-0">
                                Our fastest model, great for the most everyday
                                tasks.
                            </p>
                            <p className="text-center">
                                Available for free and plus users
                            </p>
                        </div>
                    </Col>
                </Row>
                {chats == 0 ? (
                    <Row className="mt-5">
                        {initialMessages?.map((item) => {
                            return (
                                <Col md="6" className="mt-4 p-0" key={item?.id}>
                                    <Card className="shadow-sm card-custom mx-1 mt-3">
                                        <CardBody
                                            className="cursor"
                                            onClick={async () => {
                                                submit(item?.title);
                                            }}
                                        >
                                            <h6>{item?.title}</h6>
                                            <p>{item?.description}</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                ) : (
                    <div className="chat-body mt-3">
                        {chats.map((item) => {
                            return (
                                <>
                                    <Row className="p-3 border">
                                        <Col>
                                            <div className="d-flex ">
                                                <span className="avatar avatar-sm rounded-circle">
                                                    <img
                                                        src={user}
                                                        alt="1"
                                                        className=" mx-1"
                                                        height={35}
                                                        width={35}
                                                    />
                                                </span>

                                                <p className="mx-3">
                                                    {item.user}
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="bg-site-secondary p-3 border">
                                        <Col>
                                            <div className="d-flex ">
                                                <span className="avatar avatar-sm rounded-circle ">
                                                    <img
                                                        src={bot}
                                                        alt="1"
                                                        className=" mx-1"
                                                        height={30}
                                                        width={30}
                                                    />
                                                </span>

                                                <p className="mx-3">
                                                    {item.bot}
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                            );
                        })}
                    </div>
                )}
                <Row className="footer">
                    <Col xs="12" className="mb-3 send-text-design shadow ">
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                submit(typeMessage);
                            }}
                        >
                            <div className="py-2 d-flex justify-content-between px-2 align-items-center">
                                <Input
                                    className="border-0 p-0"
                                    placeholder="Send me message "
                                    value={typeMessage}
                                    type="text"
                                    onChange={(e) => {
                                        setTypeMessage(e.target.value);
                                    }}
                                />

                                {loading ? (
                                    <DotPulse
                                        size={25}
                                        speed={1.3}
                                        color="black"
                                    />
                                ) : (
                                    <Button
                                        className="light border-0"
                                        type="submit"
                                    >
                                        <IoSend
                                            className={`icon-design ${
                                                typeMessage != ""
                                                    ? "text-success"
                                                    : ""
                                            }`}
                                        />
                                    </Button>
                                )}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminView;
