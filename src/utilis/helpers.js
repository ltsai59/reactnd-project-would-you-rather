export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  // return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  return d.toDateString() + ' at ' + time.substr(0, 5) + time.slice(-2)
}

export function formatQuestionOverview (question, author) {
  const { optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author

  return {
    author: name,
    avatar: avatarURL,
    datetime: formatDate(timestamp),
    option1: `....${optionOne.text.substring(0, 10)}....`,
    option2: `....${optionTwo.text.substring(0, 10)}....`,
  }
}

export function formatQuestionDetail(question, author, users) {
  const { optionOne, optionTwo } = question
  const { name, avatarURL } = author
  const totalVoters = Object.keys(users).length
  const option1Count = optionOne.votes.length
  const option2Count = optionTwo.votes.length
  return {
    author: name,
    avatar: avatarURL,
    totalVoters: totalVoters,
    option1Percentage: (option1Count*100/totalVoters).toFixed(2),
    option2Percentage: (option2Count*100/totalVoters).toFixed(2),
    option1: `${optionOne.text}?`,
    option2: `${optionTwo.text}?`,
    option1Count: option1Count,
    option2Count: option2Count,
  }
}

export function formatQuestion (question, author) {
  const { optionOne, optionTwo } = question
  const { name, avatarURL } = author

  return {
    author: name,
    avatar: avatarURL,
    option1: `${optionOne.text}?`,
    option2: `${optionTwo.text}?`,
  }

}
