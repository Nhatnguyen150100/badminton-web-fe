import AccountService from './accountService';
import AuthService from './authService';
import ExamService from './examService';
import KanjiService from './kanjiService';
import LoginLogService from './loginLogService';
import ProfileService from './profileService';
import TestService from './testService';

export const authService = new AuthService();
export const kanjiService = new KanjiService();
export const profileService = new ProfileService();
export const accountService = new AccountService();
export const loginLogService = new LoginLogService();
export const examService = new ExamService();
export const testService = new TestService();
