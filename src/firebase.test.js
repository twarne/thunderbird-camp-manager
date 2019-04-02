import {
  initializeAdminApp,
  loadFirestoreRules,
  apps,
  initializeTestApp,
  assertSucceeds,
  assertFails
} from '@firebase/testing';
import { readFileSync } from 'fs';
import { exportAllDeclaration } from '@babel/types';

const permissionForms = [
  {
    participant: {
      name: 'p1'
    },
    ward: 'thills',
    eventRef: 'ywcamp2019'
  },
  {
    participant: {
      name: 'p2'
    },
    ward: 'sv',
    eventRef: 'ywcamp2019'
  },
  {
    participant: {
      name: 'p3'
    },
    ward: 'st',
    eventRef: 'ywcamp2019'
  },
  {
    participant: {
      name: 'p4'
    },
    ward: 'thills',
    eventRef: 'ywcamp2019'
  }
];

const users = [
  {
    uid: 'adminUser1',
    roles: ['admin']
  },
  {
    uid: 'stakeGeneralLeader',
    roles: ['stake', 'general']
  },
  {
    uid: 'wardGeneralLeader',
    roles: ['ward', 'general'],
    ward: 'thills'
  },
  {
    uid: 'stakeEventLeader',
    roles: ['stake', 'general'],
    event: 'ywcamp2019'
  },
  {
    uid: 'wardEventLeader',
    roles: ['ward', 'general'],
    event: 'ywcamp2019',
    ward: 'thills'
  },
  {
    uid: 'nobody',
    roles: []
  }
];

const setupData = () => {
  debugger;
  loadFirestoreRules({
    projectId: 'tcm-test',
    rules: readFileSync('./firestore.rules', 'utf8')
  });
  const adminApp = initializeAdminApp({ projectId: 'tcm-test' });
  const adminFirestore = adminApp.firestore();
  const pformscollection = adminFirestore.collection('permissionForms');
  permissionForms.forEach(item => pformscollection.add(item));
  const userscollection = adminFirestore.collection('users');
  users.forEach(item => userscollection.doc(item.uid).set(item));
};

const loadPermissionForms = app => {
  debugger;
  return app
    .firestore()
    .collection('permissionForms')
    .where('eventRef', '==', 'ywcamp2019')
    .get();
};

beforeAll(() => {
  return setupData();
});

afterAll(() => {
  return Promise.all(apps().map(app => app.delete()));
});

test('Admin can load all documents', async () => {
  const testApp = initializeTestApp({ projectId: 'tcm-test', auth: { uid: 'adminUser1' } });
  await expect(
    assertSucceeds(
      testApp
        .firestore()
        .collection('permissionForms')
        .where('eventRef', '==', 'ywcamp2019')
        .get()
    )
  ).resolves.toBe(4);
});

test('Nobody can load no documents', async () => {
  const testApp = initializeTestApp({ projectId: 'tcm-test', auth: { uid: 'nobody' } });
  await expect(
    assertFails(
      testApp
        .firestore()
        .collection('permissionForms')
        .where('eventRef', '==', 'ywcamp2019')
        .get()
    )
  ).resolves.toBeDefined();
});

test('Stake general leader can load all documents', async () => {
  const testApp = initializeTestApp({ projectId: 'tcm-test', auth: { uid: 'stakeGeneralLeader' } });
  await expect(
    assertSucceeds(
      testApp
        .firestore()
        .collection('permissionForms')
        .where('eventRef', '==', 'ywcamp2019')
        .get()
    )
  ).resolves.toBeDefined();
});

test('Ward general leader cannot load all documents', async () => {
  const testApp = initializeTestApp({ projectId: 'tcm-test', auth: { uid: 'wardGeneralLeader' } });
  await expect(
    assertFails(
      testApp
        .firestore()
        .collection('permissionForms')
        .where('eventRef', '==', 'ywcamp2019')
        .get()
    )
  ).resolves.toBeDefined();
});

test('Ward general leader can load all ward documents', async () => {
  const testApp = initializeTestApp({ projectId: 'tcm-test', auth: { uid: 'wardGeneralLeader' } });
  await expect(
    assertSucceeds(
      testApp
        .firestore()
        .collection('permissionForms')
        .where('eventRef', '==', 'ywcamp2019')
        .where('ward', '==', 'thills')
        .get()
    )
  ).resolves.toBeDefined();
});
