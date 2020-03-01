import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

import FooterSection from './footer';
import styles from './styles';

import * as ROLES from '../../constants/roles';

const BaseReport = props => {
  const { event, authUser, title, children } = props;

  const isStake =
    authUser && authUser.roles && (authUser.roles.includes(ROLES.STAKE_LEADER) || authUser.roles.includes(ROLES.ADMIN));

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>
          {title} - {isStake ? 'Stake' : `${authUser.ward} Ward`}
        </Text>
        <Text style={styles.subtitle}>{event.title}</Text>
        <View>{children}</View>
        <FooterSection reportName={title} />
      </Page>
    </Document>
  );
};

export default BaseReport;
