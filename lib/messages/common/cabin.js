var definitions = {
    R: 'Supersonic',
    P: 'First Class Premium',
    F: 'First Class',
    A: 'First Class Discounted',
    J: 'Business Class Premium',
    C: 'Business Class',
    D: 'Business Class Discounted',
    I: 'Business Class Discounted',
    Z: 'Business Class Discounted',
    W: 'Economy/Coach Premium',
    Y: 'Economy/Coach',
    Y: 'Economy/Coach',
    B: 'Economy/coach discounted',
    H: 'Economy/coach discounted',
    K: 'Economy/coach discounted',
    L: 'Economy/coach discounted',
    M: 'Economy/coach discounted',
    N: 'Economy/coach discounted',
    Q: 'Economy/coach discounted',
    T: 'Economy/coach discounted',
    V: 'Economy/coach discounted',
    X: 'Economy/coach discounted '
};

module.exports = function CabinType(data) {
    return {
        Code: data.cabin.toUpperCase(),
        Definition: definitions[data.cabin.toUpperCase()]
    };
};
