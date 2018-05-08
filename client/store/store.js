import Vuex from 'vuex'

export default () => {
    return new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            updateCount (state, num) {
                sate.count = num
            }
        }
    })
}