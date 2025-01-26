import axios from 'axios'
import {Product, Order} from './models.js'


export class FaceBookConector {

    lastFetch = null

    async onmessage(message, userId, first_name, last_name, created_time){
        const products = await Product.find({$text: {$search: message, $caseSensitive: false}}) /// ???
        if(products.length > 0){
            const product = products[0]
            await Order.create({product, message, user: `${userId}, ${first_name}, ${last_name}`, date: new Date()})
        }
    }

    // sendmessage(message){}

    async fetchcomments(videoId){
        try{
            const res = await axios.get(`https://graph.facebook.com/v22.0/${videoId}/comments`, {
                params: {
                    order: 'reverse_chronological',
                    since: this.lastFetch
                }
            })
            this.lastFetch = Math.floor(new Date().getTime()/1000)
    
            const {data} = res.data
            for(const comment of data){
                const {message, from: user, id: commentId, created_time} = comment;
                const {id: userId, first_name, last_name} = user;
                await this.onmessage(message, userId, first_name, last_name, created_time)
            }
    
        }
        catch{}
      
        
    }

}