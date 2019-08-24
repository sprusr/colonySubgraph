import {
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

import { Colony, ColonyRoles } from '../../generated/schema'

export function handleColonyInitialised(event: ColonyInitialised): void {}

export function handleColonyBootstrapped(event: ColonyBootstrapped): void {}

export function handleColonyUpgraded(event: ColonyUpgraded): void {}

export function handleColonyRoleSet(event: ColonyRoleSet): void {
  const {
    params: { user, domainId, role, setTo },
    address: colonyAddress,
  } = event

  let roles = ColonyRoles.load(`${colonyAddress.toHex()}_${domainId.toString()}_${user.toHex()}`)
  if (!roles) {
    roles = new ColonyRoles(`${colonyAddress.toHex()}_${domainId.toString()}_${user.toHex()}`)
    roles.user = user.toHex()
    roles.domain = `${colonyAddress.toHex()}_${domainId.toString()}`
  }

  switch (role) {
    // TODO: support the other roles

    case 6:
      roles.administration = setTo
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

export function handleDomainAdded(event: DomainAdded): void {}

export function handleFundingPotAdded(event: FundingPotAdded): void {}

export function handleRegisterColonyLabel(call: RegisterColonyLabelCall): void {
  const {inputs: { orbitdb, colonyName }, to: colonyAddress} = call

  const colony = Colony.load(colonyAddress.toHex())
  if (!colony) return

  colony.ensName = colonyName
  colony.orbitAddress = orbitdb
  
  colony.save()
}
