// import original module declarations
import 'react-redux';
import type { RootState } from '../src/store';

// and extend them!
declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
