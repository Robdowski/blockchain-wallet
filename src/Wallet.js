import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Wallet = () => {
    const [balance, setBalance] = useState(0)
    const [id, setId] = useState("Robdowski")

    useEffect(() => {
        axios.get('http://localhost:5000/chain')
            .then(res => {
                let chain = res.data.chain
                setBalance(getBalance(chain))
                console.log(chain)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])


    const getBalance = chain => {
        let balance = 0
        chain.map(item => {
            item.transactions.forEach(item => {
                if (item.sender === id) {
                    balance -= item.amount
                } else if (item.recipient === id) {
                    balance += item.amount
                }
            })
        })

        return balance
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        setId(e.target.id.value)
    }

    return (
        <div>
            <h1>{id}'s Wallet</h1>
            <p>Balance: {balance}</p>
            <form onSubmit={e => handleSubmit(e)}>
                <input name='id' type='text' htmlFor='id' />
                <button type='submit'>Change ID</button>
            </form>
        </div>
    )
}

export default Wallet
