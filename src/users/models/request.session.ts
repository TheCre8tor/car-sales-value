import { User } from '../entity/user.entity';

interface RequestSession {
  session?: {
    userId: string;
  };
  currentUser?: User;
}

export default RequestSession;
