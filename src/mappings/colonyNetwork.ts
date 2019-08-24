import {
  ColonyNetworkInitialised,
  TokenLockingAddressSet,
  MiningCycleResolverSet,
  NetworkFeeInverseSet,
  ColonyVersionAdded,
  MetaColonyCreated,
  ColonyAdded,
  SkillAdded,
  AuctionCreated,
  ReputationMiningInitialised,
  ReputationMiningCycleComplete,
  ReputationRootHashSet,
  UserLabelRegistered,
  ColonyLabelRegistered
} from '../../generated/ColonyNetwork/IColonyNetwork'

import { Colony, Domain, ColonyRoles, User } from '../../generated/schema'

export function handleColonyNetworkInitialised(
  event: ColonyNetworkInitialised
): void {}

export function handleTokenLockingAddressSet(
  event: TokenLockingAddressSet
): void {}

export function handleMiningCycleResolverSet(
  event: MiningCycleResolverSet
): void {}

export function handleNetworkFeeInverseSet(event: NetworkFeeInverseSet): void {}

export function handleColonyVersionAdded(event: ColonyVersionAdded): void {}

export function handleMetaColonyCreated(event: MetaColonyCreated): void {}

export function handleColonyAdded(event: ColonyAdded): void {
  const {
    params: { colonyId, colonyAddress, token },
    transaction: { from },
  } = event
  
  const creatorRoles = new ColonyRoles(`${colonyAddress.toHex()}_1_${from.toHex()}`)
  creatorRoles.user = from.toHex()
  creatorRoles.domain = `${colonyAddress.toHex()}_1`
  creatorRoles.administration = true
  creatorRoles.save()

  const rootDomain = new Domain(`${colonyAddress.toHex()}_1`)
  rootDomain.index = 1
  rootDomain.roles = [creatorRoles.id]
  rootDomain.save()

  const colony = new Colony(colonyAddress.toHex())
  colony.index = colonyId
  colony.token = token.toHex()
  colony.domains = [rootDomain.id]
  colony.save()
}

export function handleSkillAdded(event: SkillAdded): void {}

export function handleAuctionCreated(event: AuctionCreated): void {}

export function handleReputationMiningInitialised(
  event: ReputationMiningInitialised
): void {}

export function handleReputationMiningCycleComplete(
  event: ReputationMiningCycleComplete
): void {}

export function handleReputationRootHashSet(
  event: ReputationRootHashSet
): void {}

export function handleUserLabelRegistered(event: UserLabelRegistered): void {
  const { user: userAddress, label } = event.params
  const user = User.load(userAddress.toHex()) || new User(userAddress.toHex())
  user.ensName = label.toString() // TODO: this is hash currently
  user.save()
}

export function handleColonyLabelRegistered(
  event: ColonyLabelRegistered
): void {}
