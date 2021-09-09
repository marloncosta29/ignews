import { faunadb } from "../../../services/fauna";
import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";
import { icons } from "react-icons/lib";
export async function saveSubscription(
  subscriptionId: string,
  custumerId: string,
  createAction = false
) {
  const userRef = await faunadb.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), custumerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };
  if (createAction) {
    await faunadb.query(
      q.Create(q.Collection("subscriptions"), { data: subscriptionData })
    );
  } else {
    await faunadb.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(q.Match(q.Index("subscription_by_id"), subscriptionId))
        ),
        { data: subscriptionData }
      )
    );
  }
}
