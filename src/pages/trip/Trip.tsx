import { Suspense } from 'react';
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom';

import styles from './trip.module.scss';

import OrderService from '../../services/OrderService';
import { PageHeader } from '../../components/common/page-header/PageHeader';
import { People } from '../../components/common/people/People';
import { Flight } from '../../components/flight/Flight';
import { CommonOrder, OrderTypes } from '../../models/IOrder';

const Trip = () => {
  const { trip } = useLoaderData() as { trip: CommonOrder<OrderTypes.Flight> };

  return (
    <div className="container">
      <PageHeader message={'Success, have a nice flight!'} email={'testamike@gmail.com'} />
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <Await resolve={trip}>
          {(resolvedTrip) => (
            <>
              <div className="row mb-4">
                <div className="col-6">
                  <div className="label">Booking reference</div>
                  <div className={styles.ref}>{resolvedTrip.booking_reference}</div>
                </div>
                <div className="col-3">
                  <div className="label">Order amount</div>
                  <div className={styles.amount}>${resolvedTrip.total_price}</div>
                </div>
              </div>
              <div className="label mb-0">Booked flights</div>
              <Flight flight={resolvedTrip.outbound} className="mb-3" />
              <Flight flight={resolvedTrip.return} className="mb-4" />
              <div className="label">Passengers</div>
              <People peoples={resolvedTrip.passengers} />
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

const getOrder = async (id?: string) => {
  if (id) {
    const response = await OrderService.fetchOrder(id);
    return response.data;
  }
  return null;
};

const tripLoader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  return defer({
    trip: getOrder(id)
  });
};

export { Trip, tripLoader };
