import React, { useState, useEffect, useContext } from "react";

import {
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  Switch,
  Typography,
  FormLabel,
  TextField
} from "@material-ui/core";
import RegistrationFormContext from "../Context";

const OTC_MEDICATIONS = [
  {
    key: "acetaminophen",
    label: "Acetaminophen (Tylenol)",
    value: "Acetaminophen"
  },
  {
    key: "ibuprofen",
    label: "Ibuprofen (Advil)",
    value: "Ibuprofen"
  },
  {
    key: "calcium_carbonate",
    label: "Calcium Carbonate (Tums)",
    value: "Calcium Carbonate"
  },
  {
    key: "bismuth_subsalicylate",
    label: "Bismuth Subsalicylate (Pepto-Bismol)",
    value: "Bismuth Subsalicylate"
  },
  {
    key: "diphenhydramine",
    label: "Diphenhydramine (Benadryl)",
    value: "Diphenhydramine"
  },
  {
    key: "hydrocortisone_cream",
    label: "Hydrocortisone cream",
    value: "Hydrocortisone cream"
  }
];

const MedicalInformationForm = props => {
  const [medicalInformation, setMedicalInformation] = useState({
    hasDietaryRestriction: false,
    dietaryRestriction: '',
    hasAllergies: false,
    allergies: '',
    isTakingMedication: false,
    medication: '',
    canSelfAdminister: false,
    allowedOTCs: []
  });

  const registrationFormContext = useContext(RegistrationFormContext);
  registrationFormContext.updateReadyForNext(true);

  useEffect(() => {
    setMedicalInformation(props.medicalInformation);
  }, [props.medicalInformation]);

  const handleChange = event => {
    const updatedMedicalInformation = { ...medicalInformation };
    updatedMedicalInformation[event.target.name] = event.target.value;
    updatedMedicalInformation.canSelfAdminister =
      updatedMedicalInformation.isTakingMedication &&
      updatedMedicalInformation.canSelfAdminister;
    updatedMedicalInformation.dietaryRestriction = updatedMedicalInformation.hasDietaryRestriction
      ? updatedMedicalInformation.dietaryRestriction
      : "";
    updatedMedicalInformation.allergies = updatedMedicalInformation.hasAllergies
      ? updatedMedicalInformation.allergies
      : "";
    updatedMedicalInformation.medication = updatedMedicalInformation.isTakingMedication
      ? updatedMedicalInformation.medication
      : "";
    props.onChange(updatedMedicalInformation);
    setMedicalInformation(updatedMedicalInformation);
  };

  const handleSwitchChange = switchName => event => {
    handleChange({ target: { name: switchName, value: event.target.checked } });
  };

  const handleMedicationChange = event => {
    let allowedOTCs = [...medicalInformation.allowedOTCs];
    if (event.target.checked) {
      allowedOTCs.push(event.target.name);
    } else {
      allowedOTCs = allowedOTCs.filter(value => value !== event.target.name);
    }
    handleChange({ target: { name: "allowedOTCs", value: allowedOTCs } });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Medical Information
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={medicalInformation.hasDietaryRestriction ? true : false}
              onChange={handleSwitchChange("hasDietaryRestriction")}
              name="hasDietaryRestriction"
              value={medicalInformation.hasDietaryRestriction}
            />
          }
          label="Does the participant have any dietary restrictions?"
        />
        <TextField
          required
          id="dietaryRestriction"
          name="dietaryRestriction"
          label="Dietary Restriction"
          disabled={!medicalInformation.hasDietaryRestriction}
          fullWidth
          autoComplete="dietaryRestriction"
          onChange={handleChange}
          value={medicalInformation.dietaryRestriction}
          InputLabelProps={{
            shrink: medicalInformation.dietaryRestriction ? true : false
          }}
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={medicalInformation.hasAllergies ? true : false}
              onChange={handleSwitchChange("hasAllergies")}
              name="hasAllergies"
              value={medicalInformation.hasAllergies}
            />
          }
          label="Does the participant have any allergies?"
        />
        <TextField
          required
          id="allergies"
          name="allergies"
          label="Allergies"
          disabled={!medicalInformation.hasAllergies}
          fullWidth
          autoComplete="allergies"
          onChange={handleChange}
          value={medicalInformation.allergies || ""}
          InputLabelProps={{
            shrink: medicalInformation.allergies ? true : false
          }}
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={medicalInformation.isTakingMedication ? true : false}
              onChange={handleSwitchChange("isTakingMedication")}
              name="isTakingMedication"
              value={medicalInformation.isTakingMedication}
            />
          }
          label="Is the participant taking any medications or over-the-counter (OTC) drugs?"
        />
        <TextField
          required
          id="medication"
          name="medication"
          label="Medication"
          disabled={!medicalInformation.isTakingMedication}
          fullWidth
          autoComplete="medication"
          onChange={handleChange}
          value={medicalInformation.medication || ""}
          InputLabelProps={{
            shrink: medicalInformation.medication ? true : false
          }}
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={medicalInformation.canSelfAdminister ? true : false}
              onChange={handleSwitchChange("canSelfAdminister")}
              value={
                medicalInformation.isTakingMedication &&
                medicalInformation.canSelfAdminister
              }
              disabled={!medicalInformation.isTakingMedication}
            />
          }
          label="If yes, can the participant self-administer his or her medication?"
        />
      </FormGroup>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Can the activity leaders administer the following to your child?
        </FormLabel>
        <FormGroup>
          {OTC_MEDICATIONS.map(medication => {
            return (
              <FormControlLabel
                key={medication.key}
                control={
                  <Checkbox
                    name={medication.key}
                    checked={medicalInformation.allowedOTCs.includes(
                      medication.key
                    )}
                    onChange={handleMedicationChange}
                    value={medication.value}
                  />
                }
                label={medication.label}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </React.Fragment>
  );
};

export default MedicalInformationForm;
