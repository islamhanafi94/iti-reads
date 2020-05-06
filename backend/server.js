const express = require("express");
const mongoose = require("mongoose");


const connect = (url) => {
    return mongoose.connect(url)
}

