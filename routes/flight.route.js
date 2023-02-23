const express = require("express");

const { FlightModel } = require("../models/flight.model");

const flightRoutes = express.Router();

flightRoutes.get("/flights", async (req, res, next) => {
  let flight = await FlightModel.find();
  res.send({ data: flight });
});

flightRoutes.post("/flights", async (req, res, next) => {
  const payload = req.body;
  const new_flight = new FlightModel(payload);
  await new_flight.save();
  res.send({ msg: "flight created successfully" });
});

flightRoutes.patch("/flights/:id", async (req, res, next) => {
  const payload = req.body;
  const ID = req.params.id;

  await FlightModel.findByIdAndUpdate({ _id: ID }, payload);
  res.send({ msg: "flight is updated sucessfully" });
});

flightRoutes.delete("/flights/:id", async (req, res, next) => {
  const ID = req.params.id;

  await FlightModel.findByIdAndDelete({ _id: ID });
  res.send({ msg: "flight is deleted sucessfully" });
});

module.exports = { flightRoutes };
