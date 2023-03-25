//nico 

function cartaDTO(user,cart) {
    return {
        user,
        ...cart,
    }
}

module.exports = cartaDTO