import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { container } from 'tsyringe';

import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

// container.registerSingleton<IMailProvider>(
//   'MailProvider',
//   ,
// );
