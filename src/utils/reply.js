const createReply = (content, embeds, components = [], actions = {}) => {
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