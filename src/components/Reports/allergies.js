import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import styles from './styles';
import BaseReport from './base';

import * as ROLES from '../../constants/roles';

const AllergiesReport = props => {
  const { event, authUser, permissionForms } = props;

  const isStake =
    authUser && authUser.roles && (authUser.roles.includes(ROLES.STAKE_LEADER) || authUser.roles.includes(ROLES.ADMIN));

  return (
    <BaseReport title="Allergies and Dietary Restrictions" event={event} authUser={authUser}>
      <View style={styles.recordContainer}>
        {permissionForms
          .filter(form => form.hasAllergies || form.hasDietaryRestriction)
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
            return (
              <View style={styles.recordView} key={form.refPath} wrap={false}>
                <Text style={styles.participantName}>
                  {form.name} {isStake ? `(${form.fullData.participant.ward})` : ''}
                </Text>
                <Text style={styles.text}>
                  Allergies: {form.hasAllergies ? form.fullData.medicalInformation.allergies : 'None'}
                </Text>
                <Text style={styles.text}>
                  Dietary Restrictions:{' '}
                  {form.hasDietaryRestriction ? form.fullData.medicalInformation.dietaryRestriction : 'None'}
                </Text>
              </View>
            );
          })}
      </View>
    </BaseReport>
  );
};

export default AllergiesReport;
