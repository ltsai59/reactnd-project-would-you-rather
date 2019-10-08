import React from 'react'
import {connect} from 'react-redux'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import "react-tabs/style/react-tabs.css";
import QuestionOverview from './QuestionOverview'

const Dashboard = ({AnsweredQuestionIds, UnAnsweredQuestionIds}) => {
    const pStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left'
    };

    return (
        <div>
            <h3 className='center'>Your Polls</h3>

            <div className='App'>
                <Tabs>
                    <TabList>
                        <Tab>UnAnswered</Tab>
                        <Tab>Answered</Tab>
                    </TabList>

                    <TabPanel style={pStyle}>
                        <ul className='dashboard-list'>
                            {UnAnsweredQuestionIds.map((id) => (
                                <li key={id}>
                                    <QuestionOverview id={id} answered='N'/>
                                </li>
                            ))}
                        </ul>
                    </TabPanel>
                    <TabPanel style={pStyle}>
                        <ul className='dashboard-list'>
                            {AnsweredQuestionIds.map((id) => (
                                <li key={id}>
                                    <QuestionOverview id={id} answered='Y'/>
                                </li>
                            ))}
                        </ul>

                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

function mapStateToProps({questions, users, authedUser}) {
    const answeredQuestionIds = Object.keys(users[authedUser].answers)
    return {
        AnsweredQuestionIds: answeredQuestionIds.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        UnAnsweredQuestionIds: Object.keys(questions).filter(question => !answeredQuestionIds.includes(question)).sort((a, b) =>
            questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)
