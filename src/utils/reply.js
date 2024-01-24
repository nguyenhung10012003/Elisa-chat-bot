const createReply = (content, embeds = [], components = [], ephemeral = false, actions = {}) => {
    return {
        content: content,
        embeds: embeds,
        components: components,
        actions: actions
    }
}

module.exports = {
    createReply
}