import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import _ from 'lodash';
import styles from './styles';
import BaseReport from './base';

import * as ROLES from '../../constants/roles';

const TShirtReport = props => {
  const { event, authUser, permissionForms } = props;

  const bySize = permissionForms.reduce(
    (result, form) => ({
      ...result,
      [form['shirtSize']]: [...(result[form['shirtSize']] || []), form]
    }),
    {}
  );

  const isStake =
    authUser && authUser.roles && (authUser.roles.includes(ROLES.STAKE_LEADER) || authUser.roles.includes(ROLES.ADMIN));

  return (
    <BaseReport title="T-Shirt Sizes" event={event} authUser={authUser}>
      <View style={styles.recordContainer}>
        {_.entries(bySize).map(entry => {
          const size = entry[0];
          const forms = entry[1];
          return (
            <View key={entry[0]}>
              <Text style={styles.groupHeader}>{size}</Text>
              {forms
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
                    </View>
                  );
                })}
            </View>
          );
        })}
      </View>
    </BaseReport>
  );
};

export default TShirtReport;
