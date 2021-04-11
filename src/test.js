const check = require('./check')

check.performCheck('387', 'Spongebob Squarepants', 'tv').then(res => {
    console.log(res)
})
check.performCheck('298618', 'The%20Flash', 'tv').then(res => {
    console.log(res)
})
check.performCheck('298618', 'The Flash', 'tv').then(res => {
    console.log(res)
})
check.performCheck('4607', 'Lost', 'tv').then(res => {
    console.log(res)
})
check.performCheck('632357', 'The Unholy', 'movie').then(res => {
    console.log(res)
})
