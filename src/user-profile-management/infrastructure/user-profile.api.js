import { BaseApi } from '@/shared/infrastructure/base-api.js';
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js';

const baseApi = new BaseApi();

function createCollectionEndpoint(path) {
  const endpoint = new BaseEndpoint(baseApi, path);

  return {
    findBy(field, value) {
      return endpoint.http.get(endpoint.endpointPath, { params: { [field]: value } });
    },
    getById: (id) => endpoint.getById(id),
    create: (resource) => endpoint.create(resource),
    update: (id, resource) => endpoint.update(id, resource),
    delete: (id) => endpoint.delete(id),
  };
}

export const userProfilesApi = createCollectionEndpoint('/user_profiles');
export const goalsApi = createCollectionEndpoint('/goals');
export const preferencesApi = createCollectionEndpoint('/preferences');
export const restrictionsApi = createCollectionEndpoint('/restrictions');
export const nutritionistProfilesApi = createCollectionEndpoint('/nutritionist_profiles');
