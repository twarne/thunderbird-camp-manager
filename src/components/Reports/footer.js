import React from 'react';
import moment from 'moment';

import styles from './styles';
import { View, Text } from '@react-pdf/renderer';

const FooterSection = props => {
  const { reportName } = props;
  return (
    <View style={styles.footerView} fixed>
      <Text style={styles.reportName} fixed>
        {reportName}
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      <Text style={styles.reportDate} fixed>
        {moment().format('LLL')}
      </Text>
    </View>
  );
};

export default FooterSection;
