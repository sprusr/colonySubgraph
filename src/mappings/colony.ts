import { BigInt } from '@graphprotocol/graph-ts'

import {
  IColony,
  ColonyInitialised,
  ColonyBootstrapped,
  ColonyUpgraded,
  ColonyRoleSet,
  ColonyFundsMovedBetweenFundingPots,
  ColonyFundsClaimed,
  RewardPayoutCycleStarted,
  RewardPayoutCycleEnded,
  RewardPayoutClaimed,
  ColonyRewardInverseSet,
  PaymentAdded,
  TaskAdded,
  TaskBriefSet,
  TaskDueDateSet,
  TaskDomainSet,
  TaskSkillSet,
  TaskRoleUserSet,
  TaskPayoutSet,
  TaskDeliverableSubmitted,
  TaskCompleted,
  TaskWorkRatingRevealed,
  TaskFinalized,
  PayoutClaimed,
  TaskCanceled,
  DomainAdded,
  FundingPotAdded,
  RegisterColonyLabelCall,
} from '../../generated/ColonyNetwork/templates/Colony/IColony'
import { IColonyNetwork } from '../../generated/ColonyNetwork/IColonyNetwork'

import { Colony, ColonyRoles, Domain } from '../../generated/schema'

export function handleColonyInitialised(event: ColonyInitialised): void {}

export function handleColonyBootstrapped(event: ColonyBootstrapped): void {}

export function handleColonyUpgraded(event: ColonyUpgraded): void {}

export function handleColonyRoleSet(event: ColonyRoleSet): void {
  let roles = ColonyRoles.load(`${event.address.toHex()}_${event.params.domainId.toString()}_${event.params.user.toHex()}`)
  if (!roles) {
    roles = new ColonyRoles(`${event.address.toHex()}_${event.params.domainId.toString()}_${event.params.user.toHex()}`)
    roles.user = event.params.user.toHex()
    roles.domain = `${event.address.toHex()}_${event.params.domainId.toString()}`
  }

  switch (event.params.role) {
    // TODO: support the other roles

    case 6:
      roles.administration = event.params.setTo
      break;

    default:
      break;
  }

  roles.save()
}

export function handleColonyFundsMovedBetweenFundingPots(
  event: ColonyFundsMovedBetweenFundingPots
): void {}

export function handleColonyFundsClaimed(event: ColonyFundsClaimed): void {}

export function handleRewardPayoutCycleStarted(
  event: RewardPayoutCycleStarted
): void {}

export function handleRewardPayoutCycleEnded(
  event: RewardPayoutCycleEnded
): void {}

export function handleRewardPayoutClaimed(event: RewardPayoutClaimed): void {}

export function handleColonyRewardInverseSet(
  event: ColonyRewardInverseSet
): void {}

export function handlePaymentAdded(event: PaymentAdded): void {}

export function handleTaskAdded(event: TaskAdded): void {}

export function handleTaskBriefSet(event: TaskBriefSet): void {}

export function handleTaskDueDateSet(event: TaskDueDateSet): void {}

export function handleTaskDomainSet(event: TaskDomainSet): void {}

export function handleTaskSkillSet(event: TaskSkillSet): void {}

export function handleTaskRoleUserSet(event: TaskRoleUserSet): void {}

export function handleTaskPayoutSet(event: TaskPayoutSet): void {}

export function handleTaskDeliverableSubmitted(
  event: TaskDeliverableSubmitted
): void {}

export function handleTaskCompleted(event: TaskCompleted): void {}

export function handleTaskWorkRatingRevealed(
  event: TaskWorkRatingRevealed
): void {}

export function handleTaskFinalized(event: TaskFinalized): void {}

export function handlePayoutClaimed(event: PayoutClaimed): void {}

export function handleTaskCanceled(event: TaskCanceled): void {}

export function handleDomainAdded(event: DomainAdded): void {
  let domain = new Domain(`${event.address.toHex()}_${event.params.domainId.toString()}`)
  domain.index = event.params.domainId
  domain.parent = `${event.address.toHex()}_1`
  domain.save()
}

export function handleFundingPotAdded(event: FundingPotAdded): void {}

export function handleRegisterColonyLabel(call: RegisterColonyLabelCall): void {
  let colony = Colony.load(call.to.toHex())
  
  if (colony) {
    colony.ensName = call.inputs.colonyName
    colony.orbitAddress = call.inputs.orbitdb
    colony.save()
  }
}
