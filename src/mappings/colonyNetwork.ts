import { BigInt } from "@graphprotocol/graph-ts"
import {
  IColonyNetwork,
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
} from "../../generated/ColonyNetwork/IColonyNetwork"
import { ExampleEntity } from "../../generated/schema"

export function handleColonyNetworkInitialised(
  event: ColonyNetworkInitialised
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.resolver = event.params.resolver

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.numRecoveryRoles(...)
  // - contract.isInRecoveryMode(...)
  // - contract.supportsInterface(...)
  // - contract.getReplacementReputationUpdateLogEntry(...)
  // - contract.getReplacementReputationUpdateLogsExist(...)
  // - contract.getMetaColony(...)
  // - contract.getColonyCount(...)
  // - contract.isColony(...)
  // - contract.addSkill(...)
  // - contract.getSkill(...)
  // - contract.getSkillCount(...)
  // - contract.getReputationMiningSkillId(...)
  // - contract.getTokenLocking(...)
  // - contract.createColony(...)
  // - contract.getColony(...)
  // - contract.getCurrentColonyVersion(...)
  // - contract.getParentSkillId(...)
  // - contract.getChildSkillId(...)
  // - contract.getReputationMiningCycle(...)
  // - contract.calculateMinerWeight(...)
  // - contract.getColonyVersionResolver(...)
  // - contract.getReputationRootHash(...)
  // - contract.getReputationRootHashNNodes(...)
  // - contract.getProfileDBAddress(...)
  // - contract.lookupRegisteredENSDomain(...)
  // - contract.addr(...)
  // - contract.getENSRegistrar(...)
  // - contract.getMiningResolver(...)
  // - contract.getFeeInverse(...)
}

export function handleTokenLockingAddressSet(
  event: TokenLockingAddressSet
): void {}

export function handleMiningCycleResolverSet(
  event: MiningCycleResolverSet
): void {}

export function handleNetworkFeeInverseSet(event: NetworkFeeInverseSet): void {}

export function handleColonyVersionAdded(event: ColonyVersionAdded): void {}

export function handleMetaColonyCreated(event: MetaColonyCreated): void {}

export function handleColonyAdded(event: ColonyAdded): void {}

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

export function handleUserLabelRegistered(event: UserLabelRegistered): void {}

export function handleColonyLabelRegistered(
  event: ColonyLabelRegistered
): void {}
