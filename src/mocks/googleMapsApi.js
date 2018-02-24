import MockAdapter from 'axios-mock-adapter';
import { instance, requestInterceptorId, responseInterceptorId } from '../api/googleMaps';

instance.interceptors.request.eject(requestInterceptorId);
instance.interceptors.response.eject(responseInterceptorId);

const mock = new MockAdapter(instance);

export default mock;
