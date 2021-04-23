import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summar page and entry page both need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
        {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
