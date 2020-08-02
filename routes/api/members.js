const express = require('express')
let members = require('../../data')

const router = express.Router()


// Get member by ID
router.get('/:id', (req, res) => {
    const member = members.filter(member => member.id === parseInt(req.params.id))
    if (member.length < 1) {
        res.status(400);
        res.send({
            msg:  `Member with ID ${req.params.id} not found`
        });
        return;
    }
    res.send(member[0])
})


// Get all members
router.get('/', (req, res) => {
    res.json(members)
});


// Create member
router.post('/', (req, res) => {
    if (!req.body.email || !req.body.name) {
        return res.status(400).json({
            msg: 'Email or Name must not be empty'
        })
    }

    const newMember = {
        id: members.length < 1 ? 1 : members[members.length - 1].id + 1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    members.push(newMember)
    res.json({
        msg: 'New member added'
    })
})

// Update member
router.put('/:id', (req, res) => {
    const data = req.body
    const member = members.filter(member => member.id === parseInt(req.params.id))
    if (member.length < 1) {
        return res.status(400).json({
            msg:  `Member with ID ${req.params.id} not found`
        });
    }  

    members.forEach(member => {
        if (member.id === parseInt(req.params.id)) {
            member.name = data.name ? data.name : member.name;
            member.email = data.email ? data.email : member.email;
        }
    })
    
    res.json({
        msg: 'Member updated'
    })
})

// Delete member
router.delete('/:id', (req, res) => {
    const member = members.filter(member => member.id === parseInt(req.params.id))
    if (member.length < 1) {
        return res.status(400).json({
            msg:  `Member with ID ${req.params.id} not found`
        });
    }  

    let index = members.findIndex(member => member.id === parseInt(req.params.id))
    if (index === 0) {
        members.shift()
    } else {
        members = members.slice(0, index)
    }
    
    res.json({
        msg: 'Member deleted'
    })
})

module.exports = router