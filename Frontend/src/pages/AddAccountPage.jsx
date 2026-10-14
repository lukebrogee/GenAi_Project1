import { useState } from 'react'
import Card from '../components/Card'
import CardHeading from '../components/CardHeading'
import InstitutionPicker from '../components/InstitutionPicker'
import LinkedInstitutionList from '../components/LinkedInstitutionList'
import PlaidLinkModal from '../components/PlaidLinkModal'
import {
  getInstitutions,
  linkAccounts,
  unlinkInstitution,
} from '../services/dataService'
import { useLinkedData } from '../services/useLinkedData'

export default function AddAccountPage() {
  useLinkedData()
  const [linkingId, setLinkingId] = useState(null)
  const [notice, setNotice] = useState(null)

  // Read fresh each render so the modal sees accounts as they get linked.
  const linking = getInstitutions().find((i) => i.id === linkingId)

  const handleUnlink = (institution) => {
    unlinkInstitution(institution.id)
    setNotice(`Unlinked ${institution.name}.`)
  }

  return (
    <div className="page-grid">
      <Card span={7} label="Connect an institution">
        <CardHeading title="Connect an Account" />
        <p className="section-note">
          Choose your card issuer to bring its accounts and transactions into
          Cardfolio. Connections are simulated with prepared mock data; no real
          bank is contacted.
        </p>
        {notice ? (
          <p className="form-success" role="status">
            {notice}
          </p>
        ) : null}
        <InstitutionPicker
          onSelect={(id) => {
            setNotice(null)
            setLinkingId(id)
          }}
        />
      </Card>

      <Card span={5} label="Linked accounts">
        <CardHeading title="Linked Accounts" />
        <LinkedInstitutionList onUnlink={handleUnlink} />
      </Card>

      {linking ? (
        <PlaidLinkModal
          key={linking.id}
          institution={linking}
          onLink={linkAccounts}
          onClose={() => setLinkingId(null)}
        />
      ) : null}
    </div>
  )
}
