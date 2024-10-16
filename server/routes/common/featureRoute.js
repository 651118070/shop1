import express from 'express'
import * as Features from '../../controllers/common/featureController.js'

export const Feature = express.Router();

Feature.post("/add", Features.addFeatureImage);
Feature.get("/get", Features.getFeatureImages);


