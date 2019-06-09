import React from 'react';
import { Document, Text, View, Page } from '@react-pdf/renderer';

import _ from 'lodash';
import styles from './styles';

import * as ROLES from '../../constants/roles';
import { OTC_MEDICATIONS } from '../../constants/data';
import FooterSection from './footer';

const IndividualsReport = props => {
  const { event, authUser, permissionForms } = props;

  const isStake =
    authUser && authUser.roles && (authUser.roles.includes(ROLES.STAKE_LEADER) || authUser.roles.includes(ROLES.ADMIN));

  return (
    <Document>
      {permissionForms
        .sort((form1, form2) => {
          const name1 = form1.name.toUpperCase();
          const name2 = form2.name.toUpperCase();
          if (name1 < name2) {
            return -1;
          }
          if (name1 > name2) {
            return 1;
          }
          return 0;
        })
        .map(form => {
          const title = `${form.name} - ${form.fullData.participant.ward}`;
          console.log(form);
          return (
            <Page size="LETTER" style={styles.body} key={form.refPath}>
              <View style={styles.recordContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.sectionGroup}>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Participant Information</Text>
                    <Text style={styles.sectionData}>Name: {form.name}</Text>
                    <Text style={styles.sectionData}>Birthdate: {form.fullData.participant.dateOfBirth}</Text>
                    <Text style={styles.sectionData}>Phone Number: {form.phoneNumber}</Text>
                    <Text style={styles.sectionData}>Address: {form.address.address}</Text>
                    <Text style={styles.sectionData}>
                      City/State: {form.address.city}, {form.address.state}
                    </Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Emergency Contact</Text>
                    <Text style={styles.sectionData}>Name: {form.fullData.emergencyContact.name}</Text>
                    <Text style={styles.sectionData}>Phone Number: {form.fullData.emergencyContact.phoneNumber}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Medical Information</Text>
                    <Text style={styles.sectionData}>
                      Allergies: {form.hasAllergies ? form.fullData.medicalInformation.allergies : 'None'}
                    </Text>
                    <Text style={styles.sectionData}>
                      Dietary Restrictions:{' '}
                      {form.hasDietaryRestriction ? form.fullData.medicalInformation.dietaryRestriction : 'None'}
                    </Text>
                    <Text style={styles.sectionData}>
                      Medications: {form.isTakingMedication ? form.medication : 'None'}
                    </Text>
                    <Text style={styles.sectionData}>
                      Allowed OTC Medication:{' '}
                      {form.allowedOTCs ? form.allowedOTCs.map(otc => OTC_MEDICATIONS[otc].label) : 'None'}
                    </Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Other Information</Text>
                    <Text style={styles.sectionData}>
                      Recurring Illnesses:{' '}
                      {form.hasRecurringIllnes ? form.fullData.physicalConditions.recurringIllness : 'None'}
                    </Text>
                    <Text style={styles.sectionData}>
                      Surgeries: {form.hasSurgery ? form.fullData.physicalConditions.surgery : 'None'}
                    </Text>
                    <Text style={styles.sectionData}>
                      Restrictions: {form.fullData.physicalConditions.restrictions}
                    </Text>
                  </View>
                </View>
              </View>
              <FooterSection reportName={title} />
            </Page>
          );
        })}
    </Document>
  );
};

export default IndividualsReport;
