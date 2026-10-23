import { HttpContextToken } from '@angular/common/http';

export const skipGlobalLoader = new HttpContextToken<boolean>(() => false);
