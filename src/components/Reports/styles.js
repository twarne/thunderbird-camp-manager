import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  src: 'https://fonts.gstatic.com/s/robotoslab/v8/BngMUXZYTXPIvIBgJJSb6ufN5qCr4xCC.ttf',
  family: 'Roboto Slab'
});

Font.register({ src: 'https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxPKTU1Kg.ttf', family: 'Roboto' });

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  text: {
    margin: 6,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Roboto Slab'
  },
  participantName: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Roboto'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey'
  },
  groupHeader: {
    marginTop: 5,
    paddingTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  recordContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  recordView: {
    padding: 5,
    margin: 5,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  },
  reportDate: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'right',
    color: 'grey'
  },
  reportName: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'left',
    color: 'grey'
  },
  footerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
export default styles;
