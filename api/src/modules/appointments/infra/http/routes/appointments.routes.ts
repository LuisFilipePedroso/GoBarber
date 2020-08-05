import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import AuthenticationAssurance from '@modules/users/infra/http/middlewares/AuthenticationAssurance';
import { Router } from 'express';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(AuthenticationAssurance);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//
//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
