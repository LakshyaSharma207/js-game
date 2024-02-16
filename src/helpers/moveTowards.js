export default function moveTowards(person, destinationPosition, speed) {
  let distanceToTravelX = destinationPosition.x - person.position.x;
  let distanceToTravelY = destinationPosition.y - person.position.y;

  let distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);

  if (distance <= speed) {
    // If we're close enough, just move directly to the destination
    person.position.x = destinationPosition.x;
    person.position.y = destinationPosition.y;
  } else {
    // Otherwise, move by the specified speed in the direction of the destination
    let normalizedX = distanceToTravelX / distance;
    let normalizedY = distanceToTravelY / distance;

    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    // Recalculate remaining distance after the move
    distanceToTravelX = destinationPosition.x - person.position.x;
    distanceToTravelY = destinationPosition.y - person.position.y;
    distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);
  }

  return distance;
}