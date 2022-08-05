import ContentContainer from './components/content-container/ContentContainer';
import { POSTS } from '../tools/general/system-variables.util';

export default function Home() {
  return (
    <ContentContainer view={POSTS}
                      showClientsSideBar={ true } >
      <div>
        Hi there!!!
      </div>
    </ContentContainer>
  );
}
