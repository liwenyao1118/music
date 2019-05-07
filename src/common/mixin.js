import {mapGetters} from 'vuex'
export const listHeight = {
    mounted(){
        this.handlePlaylist()
    },
    activated(){
        this.handlePlaylist()
    },
    watch: {
        playlist(newVal){
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist(){
            throw new Error('Must adjust the scrolling list height')
        }
    },
    computed: {
        ...mapGetters([
            'playlist'
        ])
    }
}